import { apiHandler } from "@/helpers/apiHandler";
import login from "@/pages/api/user/login";

apiHandler({
  post: login,
})

export default apiHandler;