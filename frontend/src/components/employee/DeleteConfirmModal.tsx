import { HiExclamation } from "react-icons/hi";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { Employee } from "../../types/employee.types";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employee: Employee | null;
  isDeleting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  employee,
  isDeleting,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Employee" size="sm">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="h-12 w-12 rounded-full bg-danger-50 flex items-center justify-center">
          <HiExclamation className="h-6 w-6 text-danger-600" />
        </div>
        <div>
          <p className="text-sm text-surface-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-surface-900">
              {employee?.fullName}
            </span>
            ? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3 w-full pt-1">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}