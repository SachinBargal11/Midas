System.register(['./guards/validate-active-session', '../components/pages/users/add-user', '../components/pages/users/update-user', '../components/pages/users/users-list'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var validate_active_session_1, add_user_1, update_user_1, users_list_1;
    var UsersRoutes;
    return {
        setters:[
            function (validate_active_session_1_1) {
                validate_active_session_1 = validate_active_session_1_1;
            },
            function (add_user_1_1) {
                add_user_1 = add_user_1_1;
            },
            function (update_user_1_1) {
                update_user_1 = update_user_1_1;
            },
            function (users_list_1_1) {
                users_list_1 = users_list_1_1;
            }],
        execute: function() {
            exports_1("UsersRoutes", UsersRoutes = [
                {
                    path: 'users',
                    component: users_list_1.UsersListComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'users/add',
                    component: add_user_1.AddUserComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                },
                {
                    path: 'users/update/:id',
                    component: update_user_1.UpdateUserComponent,
                    canActivate: [validate_active_session_1.ValidateActiveSession]
                }
            ]);
        }
    }
});
//# sourceMappingURL=user-routes.js.map