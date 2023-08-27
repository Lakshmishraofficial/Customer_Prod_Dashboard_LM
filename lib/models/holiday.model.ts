import mongoose, { Document, Schema } from 'mongoose'; 
 
interface Holiday extends Document { 
  name: string; 
  date: string; 
} 
 
const holidaySchema = new Schema<Holiday>({ 
  name: { type: String, required: true }, 
  date: { type: String, required: true }, 
}); 
 
// Define the model if it doesn't exist 
const HolidayModel = mongoose.models.Holiday || mongoose.model<Holiday>('Holiday', holidaySchema); 
 
export default HolidayModel;