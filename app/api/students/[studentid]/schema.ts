import { z } from "zod";

const schema = z.object({
  username: z.string(),
  studentID: z.string(),
  student_phone_number: z.string().min(11),
  student_social_security_number: z.string().min(10),
  password: z.string().min(8),
  student_name: z.string(),
  student_email: z.string().email(),
  student_role: z.string(),
});
export default schema;
