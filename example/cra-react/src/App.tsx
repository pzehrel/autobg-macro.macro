import styled from 'styled-components'
import autobg from 'autobg-macro.macro'


function App() {
  return (
    <>
      <React1></React1>
      <React2></React2>
    </>
  );
}

export default App;


const React1 = styled.div`
  ${autobg('./assets/react.png')};
`

const React2 = styled.div`
  ${autobg('@/assets/react.png')}
`
