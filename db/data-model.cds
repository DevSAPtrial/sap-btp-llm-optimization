namespace sap.btp.llm;

entity PromptResponse {
  key ID : UUID;
  prompt : String(500);
  response : String(2000);
  createdAt : Timestamp;
}
