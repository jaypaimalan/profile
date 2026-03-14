/**
 * AmbientBlobs
 * Animated morphing blobs on the left and right viewport gutters,
 * diffused by a backdrop-filter:blur overlay.
 * Colors react to the active accent theme.
 */
export function AmbientBlobs({ AC, isDark }) {
  const alpha = (hex, darkVal, lightVal) => `${hex}${isDark ? darkVal : lightVal}`

  const clusterStyle = (side) => ({
    position: 'fixed',
    [side]: 0,
    top: 0,
    // width: 'max(180px, calc(50vw - 530px))',
    width: 'max(180px, 100%)',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 0,
    overflow: 'hidden',
  })

  return (
    <>
      {/* ── Left cluster ── */}
      <div style={clusterStyle('left')}>
        <div className="blob blob-1" style={{ width: 280, height: 280, background: alpha(AC.from, 'cc', '99'), position: 'absolute', top: '8%',  left: '-60px' }} />
        <div className="blob blob-3" style={{ width: 220, height: 220, background: alpha(AC.to,   'aa', '77'), position: 'absolute', top: '40%', left: '10px'  }} />
        <div className="blob blob-2" style={{ width: 180, height: 180, background: alpha(AC.from, '88', '55'), position: 'absolute', top: '68%', left: '-30px' }} />
        <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(35px)', WebkitBackdropFilter: 'blur(35px)' }} />
      </div>

      {/* ── Right cluster ── */}
      <div style={clusterStyle('right')}>
        <div className="blob blob-2" style={{ width: 260, height: 260, background: alpha(AC.to,   'bb', '88'), position: 'absolute', top: '15%', right: '-50px' }} />
        <div className="blob blob-4" style={{ width: 200, height: 200, background: alpha(AC.from, '99', '66'), position: 'absolute', top: '48%', right: '-20px' }} />
        <div className="blob blob-1" style={{ width: 240, height: 240, background: alpha(AC.to,   'aa', '77'), position: 'absolute', top: '72%', right: '-60px' }} />
        <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(35px)', WebkitBackdropFilter: 'blur(35px)' }} />
      </div>
    </>
  )
}
