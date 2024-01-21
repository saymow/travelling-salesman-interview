import api from "../../services/api";
import { ClientsSalesmanTravellingResult } from "../path/path-model";

class PathService {
  async show(): Promise<ClientsSalesmanTravellingResult> {
    return api.get("/path").then((res) => res.data);
  }
}

export default new PathService();
