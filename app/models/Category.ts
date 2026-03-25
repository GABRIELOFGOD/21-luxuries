import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
    image: {
      type: String,
      trim: true,
      default: '/images/brand/21luxury-logo.jpg',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
CategorySchema.index({ name: 1 });
CategorySchema.index({ isActive: 1 });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);