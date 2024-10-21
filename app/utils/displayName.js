export const displayName = (name, config) => {
    const split = name.split(" ");
    if (split.length === 1) {
      return name;
    }
  
    switch (config) {
      case "firstNamesOnly":
        return split[0];
      case "fullNames":
        return name;
      default:
      case "firstAndLastInitials":
        return `${split[0]} ${split[split.length - 1][0].toUpperCase()}.`;
    }
  };
  