import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  pin: string;
  mobile: string;
  account_type: "Agent" | "User";
  nid: string;
  created_at: Date;
  updated_at: Date;
  balance?: number;
  profit?: number;
  activeSession?: string | null;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pin: {
      type: String,
      required: true,
    },
    mobile: { type: String, required: true, unique: true },
    account_type: { type: String, enum: ["Agent", "User"], default: "User" },
    nid: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    activeSession: { type: String, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isNew) {
    this.balance = this.account_type === "Agent" ? 100000 : 40;
  }
  next();
});

const USER = mongoose.model<IUser>("User", userSchema);

export default USER;
