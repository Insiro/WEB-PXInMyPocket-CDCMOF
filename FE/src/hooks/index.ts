import { ref } from "vue";
const isOpen = ref(false);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSidebar = () => {
  return {
    isOpen,
  };
};
export { useSidebar };
