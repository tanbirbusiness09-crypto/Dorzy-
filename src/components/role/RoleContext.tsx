import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../../types';

interface RoleContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  isRoleModalOpen: boolean;
  setIsRoleModalOpen: (open: boolean) => void;
  openRoleModal: () => void;
  closeRoleModal: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        setActiveRole,
        isRoleModalOpen,
        setIsRoleModalOpen,
        openRoleModal: () => setIsRoleModalOpen(true),
        closeRoleModal: () => setIsRoleModalOpen(false),
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
