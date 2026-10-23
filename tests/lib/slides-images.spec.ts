import { test, expect } from "@playwright/test";
import sharp from "sharp";
import { downloadUrl, ImageRejectedError, MAX_UPLOAD_BYTES, processImage } from "../../src/features/slides/images";
import { deckSchema } from "../../src/features/slides/schema";
import { testPresentation } from "../../src/features/slides/decks/test-presentation";

// Code-only checks (no page): what happens to an uploaded image before it is stored, and which image URLs a deck accepts.

const photo = (width: number, height: number) =>
  sharp({ create: { width, height, channels: 3, background: { r: 200, g: 120, b: 40 } } })
    .jpeg()
    .withExif({ IFD0: { Make: "PhoneCo", Model: "Camera 1" } })
    .toBuffer();

test.describe("Slide image uploads", () => {
  test("big photos come out as WebP, at most 2560px, without metadata", async () => {
    const { data, width, height } = await processImage(await photo(4000, 3000), "image/jpeg");
    expect([width, height]).toEqual([2560, 1920]);
    const meta = await sharp(data).metadata();
    expect(meta.format).toBe("webp");
    expect(meta.exif).toBeUndefined();
  });

  test("small images keep their size", async () => {
    const { width, height } = await processImage(await photo(800, 600), "image/jpeg");
    expect([width, height]).toEqual([800, 600]);
  });

  test("rejects what isn't an accepted image, is too big, or can't be read", async () => {
    await expect(processImage(Buffer.from("<svg/>"), "image/svg+xml")).rejects.toMatchObject({ reason: "type" });
    await expect(processImage(Buffer.alloc(MAX_UPLOAD_BYTES + 1), "image/png")).rejects.toMatchObject({ reason: "size" });
    await expect(processImage(Buffer.from("not an image"), "image/png")).rejects.toBeInstanceOf(ImageRejectedError);
  });

  test("download URLs escape the object path", () => {
    expect(downloadUrl("b.firebasestorage.app", "slides/talk/a.webp", "t")).toBe(
      "https://firebasestorage.googleapis.com/v0/b/b.firebasestorage.app/o/slides%2Ftalk%2Fa.webp?alt=media&token=t",
    );
  });

  test("decks accept /public paths and uploaded images only", () => {
    const withImage = (src: string) => ({
      ...testPresentation,
      slides: [{ id: "i", layout: "image-full", image: { src, alt: "" } }],
    });
    expect(deckSchema.safeParse(withImage("/images/photo.webp")).success).toBe(true);
    expect(deckSchema.safeParse(withImage(downloadUrl("b.firebasestorage.app", "slides/x.webp", "t"))).success).toBe(true);
    expect(deckSchema.safeParse(withImage("https://example.com/photo.jpg")).success).toBe(false);
    expect(deckSchema.safeParse(withImage("http://firebasestorage.googleapis.com/x")).success).toBe(false);
  });
});
