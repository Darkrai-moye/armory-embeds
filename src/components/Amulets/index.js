// @flow

import type { Amulets } from 'armory-component-ui';
import type { EmbedProps } from '../../bootstrap';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions, Item } from 'armory-component-ui';
import styles from './styles.less';

function mapStateToProps (state) {
  return {
    amulets: state.amulets,
  };
}

type Props = EmbedProps & {
  ids: Array<number>,
  amulets?: Amulets,
  fetchAmulets?: (ids: Array<number>) => void,
};

export default connect(mapStateToProps, {
  fetchAmulets: actions.fetchAmulets,
})(
class AmuletsEmbed extends Component<Props> {
  props: Props;

  static renderAmulet (id: number, amulets?: Amulets, blankText, size, props) {
    if (id >= 0) {
      return (
        <Item
          tooltipType="amulets"
          className={styles.item}
          key={id}
          item={amulets && amulets[id]}
          size={size}
          {...props}
        />
      );
    }

    return <Item tooltipTextOverride={blankText} size={size} key={blankText} />;
  }

  componentWillMount () {
    const { ids, fetchAmulets } = this.props;

    fetchAmulets && fetchAmulets(ids);
  }

  render () {
    const { ids, amulets, className, blankText, size, ...props } = this.props;
    // TODO: Create a Gw2Amulet component that has the fetching logic inside it.
    return (
      <div className={className}>
        {ids.map((id) => AmuletsEmbed.renderAmulet(id, amulets, blankText, size, props))}
      </div>
    );
  }
}
);
