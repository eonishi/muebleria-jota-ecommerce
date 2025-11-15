import { createPortal } from "react-dom";

export default function PortalToBody({ children }) {
  return createPortal(children, document.body)
}
