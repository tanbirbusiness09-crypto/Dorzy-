import React, { useState } from 'react';
import { UserRole } from '../../types';
import { useLanguage } from '../../localization/LanguageContext';
import { useRole } from './RoleContext';
import { Modal } from '../ui/Modal';
import { RoleCard } from './RoleCard';
import { Button } from '../ui/Button';

export interface RoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSelectorModal: React.FC<RoleSelectorModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { activeRole, setActiveRole } = useRole();
  const [selectedRole, setSelectedRole] = useState<UserRole>(activeRole);

  const roles: UserRole[] = ['customer', 'shop_owner', 'tailor', 'admin'];

  const handleConfirm = () => {
    setActiveRole(selectedRole);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.roles.modalTitle}
      description={t.roles.modalSubtitle}
      maxWidth="xl"
    >
      <div className="space-y-3 my-4">
        {roles.map((role) => (
          <RoleCard
            key={role}
            role={role}
            isSelected={selectedRole === role}
            onSelect={setSelectedRole}
          />
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[#E6E2DB] flex items-center justify-end gap-3">
        <Button variant="ghost" size="md" onClick={onClose}>
          {t.common.cancel}
        </Button>
        <Button variant="primary" size="md" onClick={handleConfirm}>
          {t.roles.selectRoleBtn}
        </Button>
      </div>
    </Modal>
  );
};
