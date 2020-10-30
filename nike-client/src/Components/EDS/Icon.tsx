import React from 'react';
import { Icon as EdsIcon, IconProps } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

export const Icon = (props: IconProps) => <EdsIcon {...props} color={tokens.colors.interactive.primary__resting.hex} />;
