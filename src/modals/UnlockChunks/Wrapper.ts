// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { textSecondary, buttonPrimaryBackground } from '../../theme';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem 0;
`;

export const ChunkWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  margin: 1rem 0;

  > div {
    display: flex;
    flex-flow: row wrap;
    width: 100%;

    > section {
      display: flex;
      flex-flow: column wrap;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 0.5rem 0;

      &:first-child {
        flex-grow: 1;
      }
    }
  }

  h2 {
    margin: 0.75rem 0 0 0;
  }
  h3 {
    color: ${textSecondary};
    margin: 1rem 0 0 0;
  }
  h4 {
    background: ${buttonPrimaryBackground};
    color: ${textSecondary};
    box-sizing: border-box;
    margin: 0;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.75rem;
  }
`;

export default Wrapper;