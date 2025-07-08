import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
adoptionDate: { type: Date, default: Date.now }
});

export default mongoose.model("Adoption", adoptionSchema);
