import React from "react";
import {
  Checkbox,
  Label,
  TextInput,
  Button,
  Modal as ModalFlowbite,
} from "flowbite-react";

export type ModalProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  emailInputRef: React.RefObject<HTMLInputElement>;
};

const CustomModal = ({
  openModal,
  setOpenModal,
  emailInputRef,
}: ModalProps) => {
  return (
    <>
      <ModalFlowbite
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <ModalFlowbite.Header />
        <ModalFlowbite.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                ref={emailInputRef}
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Create account
              </a>
            </div>
          </div>
        </ModalFlowbite.Body>
      </ModalFlowbite>
    </>
  );
};

export default CustomModal;
