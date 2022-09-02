import { DirectiveBinding } from 'vue';

let handler: (ev: MouseEvent) => void;

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    const vm = binding.instance;

    // Provided expression must evaluate to a function
    if (typeof binding.value !== 'function') {
      const compName = vm?.$options.name;
      let warn = `[Vue-click-outside:] provided expression '${binding.value}' is not a function, but has to be`;
      if (compName) {
        warn += `Found in component '${compName}'`;
      }

      console.warn(warn);
    }

    // Define event handler and cache it on the element
    const { bubble } = binding.modifiers;
    handler = (e: MouseEvent): void => {
      const element = e.target as HTMLElement;
      if (bubble || (!el.contains(element) && el !== e.target)) {
        binding.value(e);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handler);
  },

  unmounted(): void {
    // Remove event listener
    document.removeEventListener('mousedown', handler);
  },
};
