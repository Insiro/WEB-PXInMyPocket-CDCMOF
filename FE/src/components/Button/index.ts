import IconButton from "./IconButton.vue";
import Button from "./Button.vue";
import { ref } from "vue";
export default Button;
export { IconButton, Button };

const btnStyle = [
  "px-2",
  "py-2",
  "font-medium",
  "tracking-wide",
  "text-white",
  "capitalize",
  "transition-colors",
  "duration-200",
  "transform",
  "bg-indigo-600",
  "rounded-md",
  "hover:bg-indigo-500",
  "focus:outline-none focus:bg-indigo-500",
];
export const BtnStyle = ref(btnStyle.join(" "));
