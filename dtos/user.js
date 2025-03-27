export class UserDTO {
    constructor(data) {
      this.user_id = data.user_id;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.email = data.email;
      this.update_at = data.update_at;
      this.DOB = data.DOB;
      this.is_active = data.is_active;
      this.is_verify = data.is_verify;
      this.role_id = data.role_id;
      this.role = data.role;
      
    }
  }