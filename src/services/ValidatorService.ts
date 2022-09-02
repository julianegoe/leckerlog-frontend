export const isRequired = () => {
    return (input: string) => input.length === 0
    ? 'Das Feld ist erforderlich.'
    : null;
  };
