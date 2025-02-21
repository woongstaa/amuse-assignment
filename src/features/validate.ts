import { z } from 'zod';

const errorMessages = {
  required: '필수 입력 항목입니다',
  min: (min: number) => `최소 ${min}자 이상 입력해주세요`,
  max: (max: number) => `최대 ${max}자까지 입력 가능합니다`
} as const;

export const validate = {
  string: {
    min: (length: number) => z.string().min(length, errorMessages.min(length)),
    max: (length: number) => z.string().max(length, errorMessages.max(length)),
    length: (min: number, max: number) => z.string().min(min, errorMessages.min(min)).max(max, errorMessages.max(max)),
    required: () => z.string().min(1, errorMessages.required)
  }
};
