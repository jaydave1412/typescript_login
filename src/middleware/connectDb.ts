import { connect } from "@/lib/database/database";

export function connectDatabase() {
  return connect();
}
