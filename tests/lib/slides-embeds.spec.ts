import { test, expect } from "@playwright/test";
import { EMBED_ORIGINS, embedProvider, isEmbedUrl, toEmbedUrl } from "../../src/features/slides/embeds";
import { buildCsp } from "../../src/lib/csp";

// Code-only checks (no page): links pasted into an embed slide, and the frames the CSP allows for them.

const ID = "abcdefghijk"; // any 11-character YouTube id

test.describe("Slide embeds", () => {
  test("YouTube links of every shape become privacy-enhanced embeds, keeping the start time", () => {
    const embed = `https://www.youtube-nocookie.com/embed/${ID}`;
    expect(toEmbedUrl(`https://www.youtube.com/watch?v=${ID}`)).toBe(embed);
    expect(toEmbedUrl(`https://youtu.be/${ID}`)).toBe(embed);
    expect(toEmbedUrl(`https://m.youtube.com/watch?v=${ID}&t=90`)).toBe(`${embed}?start=90`);
    expect(toEmbedUrl(`https://www.youtube.com/shorts/${ID}`)).toBe(embed);
    expect(toEmbedUrl("https://www.youtube.com/watch?v=short")).toBeNull();
  });

  test("other supported sites", () => {
    expect(toEmbedUrl("https://vimeo.com/123456789")).toBe("https://player.vimeo.com/video/123456789");
    expect(toEmbedUrl("https://www.loom.com/share/abc123def")).toBe("https://www.loom.com/embed/abc123def");
    expect(toEmbedUrl("https://codesandbox.io/s/my-sandbox-x1y2")).toBe("https://codesandbox.io/embed/my-sandbox-x1y2");
    expect(toEmbedUrl("https://stackblitz.com/edit/vitejs-vite-abc")).toBe("https://stackblitz.com/edit/vitejs-vite-abc?embed=1");
    const figma = toEmbedUrl("https://www.figma.com/design/KEY123/My-file?node-id=1-2");
    expect(figma).toMatch(/^https:\/\/www\.figma\.com\/embed\?embed_host=listerineh&url=https%3A%2F%2Fwww\.figma\.com%2Fdesign%2FKEY123/);
  });

  test("refuses other sites, plain http and nonsense", () => {
    expect(toEmbedUrl("https://evil.example/watch?v=x")).toBeNull();
    expect(toEmbedUrl(`http://youtu.be/${ID}`)).toBeNull();
    expect(toEmbedUrl("not a url")).toBeNull();
  });

  test("stored embeds must already be in embed form; normalizing them changes nothing", () => {
    const embed = toEmbedUrl(`https://youtu.be/${ID}`)!;
    expect(isEmbedUrl(embed)).toBe(true);
    expect(toEmbedUrl(embed)).toBe(embed);
    expect(isEmbedUrl("https://evil.example/embed")).toBe(false);
    expect(embedProvider(embed)).toBe("YouTube");
  });

  test("the CSP frames exactly the embed sites (plus the site's own)", () => {
    const frameSrc = buildCsp("n", { mode: "production" })
      .split("; ")
      .find((directive) => directive.startsWith("frame-src"))!;
    for (const origin of EMBED_ORIGINS) expect(frameSrc).toContain(origin);
  });
});
