'use client'

import { Search, X } from 'lucide-react'
import { Input } from './Input'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  /** Accessible name of the field. */
  label: string
  clearLabel: string
  className?: string
}

export function SearchField({ value, onChange, placeholder, label, clearLabel, className }: SearchFieldProps) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pl-11 pr-12 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={clearLabel}
          className="absolute right-0.5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
