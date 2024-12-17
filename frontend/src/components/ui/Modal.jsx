import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react"; // Optional: Icon for close button
import React from "react";

export function Modal({ children, isOpen, onClose }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 rounded-md p-1 hover:bg-gray-100"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export const ModalTrigger = Dialog.Trigger;
export const ModalContent = Dialog.Content;
export const ModalHeader = ({ children }) => (
  <h2 className="text-xl font-bold mb-4">{children}</h2>
);
export const ModalBody = ({ children }) => (
  <div className="mb-4">{children}</div>
);
export const ModalFooter = ({ children }) => (
  <div className="flex justify-end space-x-2">{children}</div>
);
export const ModalClose = Dialog.Close;
