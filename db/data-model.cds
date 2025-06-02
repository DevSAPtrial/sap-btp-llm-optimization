namespace sap.btp.llm;

entity PromptResponse {
  key ID : UUID;
  prompt : String;
  response : String;
  createdAt : Timestamp;
}