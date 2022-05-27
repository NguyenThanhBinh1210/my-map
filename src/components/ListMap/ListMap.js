import * as React from 'react'
import Box from '@mui/material/Box'
import ItemMap from '../ItemMap/ItemMap'
import { ImageList } from '../../data'
import { useSelector } from 'react-redux'

export default function BoxSx() {
	const { value } = useSelector(state => state.more)
	const [position, setPosition] = React.useState(false)
	React.useEffect(() => {
		setPosition(value)
	}, [value])
	const [dataList, setDataList] = React.useState(ImageList)
	const [enter, setEnter] = React.useState(false)

	const handleEnter = () => {
		setEnter(true)
	}
	const handleLeave = () => {
		setEnter(false)
	}

	return (
		<Box
			className="list-img"
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			sx={{
				position: 'fixed',
				borderRadius: '10px',
				zIndex: '100',
				bottom: '40px',
				left: position ? '430px' : '15px',
				width: enter ? 280 : 70,
				height: 70,
				overflow: 'hidden',
				display: 'flex',
				cursor: 'pointer',
				transition: 'left 300ms ease'
			}}
		>
			<Box
				sx={{
					width: 280,
					height: 70,
					backgroundColor: 'white',
					display: 'flex'
				}}
			>
				<div className="test" style={{ display: 'flex' }}>
					{dataList.map((item, index) => (
						<ItemMap
							key={index}
							image={item.image}
							name={item.name}
							dataList={dataList}
							setDataList={setDataList}
							news={item.new}
						>
							{item.name}
						</ItemMap>
					))}
				</div>
			</Box>
		</Box>
	)
}
