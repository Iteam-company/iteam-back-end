import { ValidationPipe } from '@/pipes/validation.pipe';

export const globalPipes = [new ValidationPipe()];
