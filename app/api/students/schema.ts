import { z } from "zod";

const schema = z.object({
  fullname: z.string(),
  social_security_number: z.string().min(10),
  student_ID: z.string().min(14),
  phone_number: z.string().min(11),
  email: z.string().email(),
  username: z.string().max(50),
  password: z.string().min(8),
});
export default schema;
