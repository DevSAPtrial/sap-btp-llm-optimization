using { sap.btp.llm as llm } from '../db/data-model';

service CatService {
  entity PromptResponse as projection on llm.PromptResponse;
  action getGPTResponse(prompt: String) returns String;
}
