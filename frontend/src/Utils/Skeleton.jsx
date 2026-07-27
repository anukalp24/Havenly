import React from 'react'

const Skeleton = () => {
  return (
    <div>
 <div>
  <div className="skeleton-property-card skeleton-card">

    <div className="skeleton-property-image skeleton"></div>

    <div className="skeleton-property-content">
      <div className="skeleton-title skeleton"></div>
      <div className="skeleton-location skeleton"></div>

      <div className="skeleton-desc skeleton"></div>
      <div className="skeleton-desc skeleton"></div>
      <div className="skeleton-desc skeleton-short skeleton"></div>
    </div>

    <div className="skeleton-price-section">
      <div className="skeleton-price skeleton"></div>

      <div className="skeleton-button skeleton"></div>
      <div className="skeleton-button skeleton"></div>
    </div>

  </div>
</div>
    </div>
  )
}

export default Skeleton
