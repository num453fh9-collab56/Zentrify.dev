export type Item = Record<string, string>;
export type SectionValues = Record<string, string | Item[]>;

export type Content = {
  /** Section on/off switches, keyed by section id */
  enabled: Record<string, boolean>;
  values: Record<string, SectionValues>;
};

type BaseField = { key: string; label: string; hint?: string };

export type ScalarField =
  | (BaseField & { type: "text" | "url" | "email"; placeholder?: string })
  | (BaseField & { type: "textarea"; rows?: number; placeholder?: string })
  | (BaseField & { type: "image" })
  | (BaseField & { type: "color" })
  | (BaseField & { type: "select"; options: { value: string; label: string }[] });

export type ListField = BaseField & {
  type: "list";
  itemLabel: string;
  /** Item key shown as the collapsed item's title */
  titleKey: string;
  fields: ScalarField[];
  newItem: Item;
  min?: number;
  max?: number;
};

export type Field = ScalarField | ListField;

export type Section = {
  id: string;
  label: string;
  description?: string;
  toggleable?: boolean;
  /** Element id in the rendered page, used to scroll the preview */
  anchor?: string;
  fields: Field[];
};

export type Preset = { name: string; swatch: string[]; values: Record<string, string> };

export type RenderOptions = {
  /** Only set for the live editor preview, never for downloads */
  preview?: { initialScroll: number; instant: boolean };
};

export type EditableTemplate = {
  id: string;
  name: string;
  schema: Section[];
  defaults: Content;
  /** Ready-made combinations applied to one section (usually colors) */
  presets?: { section: string; items: Preset[] };
  render: (content: Content, options?: RenderOptions) => string;
  /** Problems worth pointing out in the editor, e.g. a booking form with nowhere to send bookings */
  checks?: (content: Content) => { section: string; message: string }[];
};
