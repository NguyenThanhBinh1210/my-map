import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Typography } from '@mui/material'
import { setMore } from '../../redux/features/moreSlice'
import { useDispatch, useSelector } from 'react-redux'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { setSuccess } from '../../redux/features/suggestSlice'
const Loadmore = () => {
	const { value } = useSelector(state => state.more)
	const dispatch = useDispatch()
	const [enter, setEnter] = useState(false)
	const [loadmore, setLoadmore] = useState(true)
	const [realMore, setRealMore] = useState(false)
	const handleMouseEnter = () => {
		setEnter(true)
	}
	const handleMouseLeave = () => {
		setEnter(false)
	}
	const handleLoadMore = () => {
		setLoadmore(!loadmore)
		dispatch(setMore(loadmore))
		dispatch(setSuccess(false))
	}
	useEffect(() => {
		setRealMore(value)
	}, [value])
	return (
		<div
			onClick={handleLoadMore}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'all 300ms ease',
				backgroundColor: enter ? '#ccc' : 'white',
				borderRadius: '5px',
				boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
				color: 'rgb(115, 115, 115)',
				padding: '15px 10px 10px',
				cursor: 'pointer',
				marginTop: 'auto',
				marginBottom: '10px'
			}}
		>
			<Typography
				variant="subtitle3"
				pr={1}
				sx={{
					lineHeight: '1px'
				}}
			>
				{realMore ? 'Ẩn tất cả' : 'Mở rộng'}
			</Typography>
			{realMore ? (
				<ExpandLessIcon fontSize="small" />
			) : (
				<ExpandMoreIcon fontSize="small" />
			)}
		</div>
	)
}

export default Loadmore
