import React, { useState } from "react";

const roleNames: string[] = ["Учитель", "Ученик"];
const roles: ["teacher", "student"] = ["teacher", "student"];
const LoginRoleSelector: React.FC<{
  getSelectedRole: (role: "student" | "teacher") => void;
}> = ({ getSelectedRole }) => {
  const [selectedRole, setSelectedRole] = useState<number>(0);

  return (
    <div className="wrapper flex rounded-2xl overflow-hidden my-2">
      {roleNames.map((roleName, i: number) => {
        return (
          <div
            onClick={() => {
              setSelectedRole(i);
              getSelectedRole(roles[i]);
            }}
            key={roleName}
            className={`w-32 p-2 text-main-white cursor-pointer flex justify-center ${
              selectedRole === i ? "bg-main-purple" : "bg-bg-input"
            }`}
          >
            Я {roleName}
          </div>
        );
      })}
    </div>
  );
};

export default LoginRoleSelector;
