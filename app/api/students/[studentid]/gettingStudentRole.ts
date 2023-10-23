import { z } from "zod";

const schema = z.object({
  studentID: z.string(),
});
export default schema;
