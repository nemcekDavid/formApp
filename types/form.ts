export type FormField = {
    label: string;
    type: 'string' | 'number' | 'multi-line' | 'boolean' | 'date' | 'enum';
    options?: string[]; // only for enum
  };
  
  export type FormConfig = {
    title: string;
    fields: FormField[];
    buttons: string[];
  };
  