import * as yup from "yup";
import {mixed} from "yup";

let ValidatorSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone: yup.string()
      .length(10)
      .required(),
  email: yup.string().email("Valid email address required"),
  password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(30, 'Password cannot be more than 30 characters')
      .matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain uppercase letter, lowercase letter, a number, and a special character')
      .required(),
  password2: mixed().test(
    "match",
    "Passwords do not match",
    function () {
      return this.parent.password === this.parent.password2;
    }
  ),
  address1: yup.string().required(),
  address2: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required().max(2),
  zip: yup.string().min(5, 'zip code invalid').max(5).matches(/^\d+$/).required(),
  website: yup.string().url(),

});
export default ValidatorSchema;