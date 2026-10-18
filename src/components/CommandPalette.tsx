import { useEffect, useMemo, useRef, useState } from "react";
import { EMAIL, GITHUB_URL, NAV } from "../data/site.ts";
import { THEMES, type ThemeId } from "../lib/theme.ts";

type Command = { id: string; label: string; hint: string; run: () => void };

type Props = { open: boolean; onClose: () => void; onTheme: (id: ThemeId) => void };

const goTo = (id: string) => document.getElementById(id)?.scrollIntoView();

export default function CommandPalette({ open, onClose, onTheme }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const commands = useMemo<Command[]>(
    () => [
      ...NAV.map(({ id, label }) => ({
        id: `go-${id}`,
        label: `cd ~/${label}`,
        hint: "go to section",
        run: () => goTo(id),
      })),
      {
        id: "email",
        label: "copy email",
        hint: EMAIL,
        run: () => void navigator.clipboard?.writeText(EMAIL)?.catch(() => undefined),
      },
      {
        id: "github",
        label: "open github",
        hint: "new tab",
        run: () => void window.open(GITHUB_URL, "_blank", "noopener,noreferrer"),
      },
      ...THEMES.map(({ id, label }) => ({
        id: `theme-${id}`,
        label: `theme ${id}`,
        hint: label,
        run: () => onTheme(id),
      })),
      { id: "sudo", label: "sudo hire vict0r", hint: "you know you want to", run: () => goTo("contact") },
    ],
    [onTheme],
  );

  const q = query.trim().toLowerCase();
  const results = commands.filter((command) => command.label.includes(q));
  const activeId = results[index]?.id;

  // The native <dialog> gives us the focus trap, backdrop and Esc handling
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (activeId) document.getElementById(`cmd-${activeId}`)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const execute = (command: Command | undefined) => {
    if (!command) return;
    command.run();
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") return execute(results[index]);
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + results.length) % results.length);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClose={() => {
        setQuery("");
        setIndex(0);
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="mx-auto mt-[12vh] mb-auto w-[min(92vw,36rem)] rounded-lg border border-brand/50 bg-bg p-0 text-fg shadow-2xl backdrop:bg-black/70"
    >
      <div className="flex items-center gap-3 border-b border-brand/30 px-4 py-3">
        <span className="text-brand" aria-hidden="true">&gt;</span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={activeId && `cmd-${activeId}`}
          aria-label="Type a command"
          placeholder="Type a command..."
          className="w-full bg-transparent text-heading placeholder:text-fg/50 outline-none"
        />
      </div>

      {results.length > 0 ? (
        <ul id="palette-list" role="listbox" aria-label="Commands" className="max-h-48 sm:max-h-72 overflow-y-auto p-2">
          {results.map((command, i) => (
            <li
              key={command.id}
              id={`cmd-${command.id}`}
              role="option"
              aria-selected={i === index}
              onClick={() => execute(command)}
              onMouseMove={() => setIndex(i)}
              className={`flex items-center justify-between gap-4 rounded px-3 py-2 cursor-pointer ${
                i === index ? "bg-brand text-on-brand" : ""
              }`}
            >
              <span className="font-semibold">{command.label}</span>
              <span className="text-xs truncate">{command.hint}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-4 text-sm">No command matches "{query}". Try "theme" or "cd".</p>
      )}

      <p className="border-t border-brand/30 px-4 py-2 text-xs">Up/Down to move, Enter to run, Esc to close</p>
    </dialog>
  );
}
