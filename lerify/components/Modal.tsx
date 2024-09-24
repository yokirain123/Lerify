import React from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/75 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content
          className="fixed drop-shadow-md top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full 
          md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-black p-6 focus:outline-none"
        >
          <Dialog.Title className="text-[var(--accent-color)] text-center font-bold text-2xl">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm leading-normal text-center text-white">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="text-white hover:text-[var(--accent-color)] absolute top-[10px] 
            right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center focus:outline-none transition duration-300"
            >
              <IoClose size={25} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
