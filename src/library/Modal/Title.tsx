// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonHelp } from '@polkadotcloud/core-ui';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useHelp } from 'contexts/Help';
import { useModal } from 'contexts/Modal';
import { ReactComponent as CrossSVG } from 'img/cross.svg';
import { TitleWrapper } from './Wrappers';

interface TitleProps {
  title: string;
  icon?: IconProp;
  Svg?: FunctionComponent<any>;
  fixed?: boolean;
  helpKey?: string;
  style?: React.CSSProperties;
}

export const Title = ({
  helpKey,
  title,
  icon,
  fixed,
  Svg,
  style,
}: TitleProps) => {
  const { setStatus } = useModal();
  const { openHelp } = useHelp();

  const graphic = Svg ? (
    <Svg style={{ width: '1.5rem', height: '1.5rem' }} />
  ) : icon ? (
    <FontAwesomeIcon transform="grow-3" icon={icon} />
  ) : null;

  return (
    <TitleWrapper $fixed={fixed || false} style={{ ...style }}>
      <div>
        {graphic}
        <h2>
          {title}
          {helpKey ? (
            <ButtonHelp marginLeft onClick={() => openHelp(helpKey)} />
          ) : null}
        </h2>
      </div>
      <div>
        <button type="button" onClick={() => setStatus(2)}>
          <CrossSVG style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>
      </div>
    </TitleWrapper>
  );
};
