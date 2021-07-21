import { SetMetadata } from '@nestjs/common';

// @Role decorator
export const AllowAnonymous = () => SetMetadata('AllowAnonymous', true);;