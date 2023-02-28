import { ValidationBodyPipe } from './pipes/validation.pipe';

export const globalPipes = [new ValidationBodyPipe()];
