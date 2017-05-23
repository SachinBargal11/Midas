import { UserRole } from '../../../../commons/models/user-role';


export class UserRoleAdapter {
    static parseResponse(roleData: any): UserRole {
        let userRole: UserRole = new UserRole({
            id: roleData.id,
            name: UserRole.getUserRoleLabel(roleData.roleType),
            roleType: roleData.roleType
        });
        return userRole;
    }

}