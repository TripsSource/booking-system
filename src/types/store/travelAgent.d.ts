import { AgentState, TravelAgentState } from "@/types/app/travelAgent";

export interface initialStateType {
  travelAgents: AgentState[];
  travelAgent: TravelAgentState;
  loading: boolean;
}
