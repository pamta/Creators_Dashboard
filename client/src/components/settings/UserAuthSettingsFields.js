import SettingsField from './SettingsField'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { setFbUserInfo, selectFbPage } from '../../actions/facebook'
import { twitterLogin } from "../../actions/twitter";
import { setYTUserInfo } from '../../actions/youtube'

import { connect } from 'react-redux'
import BasicModal from '../layout/BasicModal'
const UserAuthFields = ({
	setFbUserInfo,
	fbUserPages,
	selectFbPage,
	fbPageHandler,
	setYTUserInfo,
	twitterLogin,
}) => {
	const [showFbPagesModal, setFbPagesModal] = useState(false)

	const genFbModalBody = () =>
		fbUserPages.map((page) => (
			<div key={page.id}>
				<p>{page.handler}</p>{' '}
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => {
						selectFbPage(page.id)
						setFbPagesModal(false)
					}}
				>
					select
				</button>
			</div>
		))

	const fbLogin = () => {
		const actionFlow = (token) => {
			setFbUserInfo(token)
			setFbPagesModal(true)
		}

		window.FB.getLoginStatus(function (response) {
			const isConnected = response.status == 'connected'
			if (isConnected) {
				actionFlow(response.authResponse.accessToken)
			} else {
				window.FB.login(function (res) {
					const couldDoLogin = res.status == 'connected'
					if (couldDoLogin) {
						console.log(res)
						actionFlow(res.authResponse.accessToken)
					}
				})
			}
		})
	}

	return (
		<div className='flex flex-col space-y-4'>
			{showFbPagesModal && (
				<BasicModal
					title={'Select your page'}
					body={genFbModalBody()}
					closeFunction={() => setFbPagesModal(false)}
				></BasicModal>
			)}
			<div className='space-y-4'>
				<SettingsField
					fieldName="Twitter"
					inputTag="twitter-handler"
					authenticate={() => twitterLogin()}
					icon={
						<svg
						className="w-4 h-4"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						>
						<title>Twitter icon</title>
						<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
						</svg>
					}
				/>
				<SettingsField
					fieldName='Facebook'
					inputTag='facebook-handler'
					textValue={fbPageHandler}
					authenticate={fbLogin}
					icon={
						<svg
							className='w-5 h-5'
							role='img'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
						>
							<title>Facebook icon</title>
							<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
						</svg>
					}
				/>
				<SettingsField
					fieldName='YouTube'
					inputTag='youtube-handler'
					authenticate={() => setYTUserInfo()}
					icon={
						<svg
							className='w-5 h-5'
							role='img'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<title>YouTube icon</title>
							<path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
						</svg>
					}
				/>
			</div>
		</div>
	)
}

UserAuthFields.propTypes = {
	setFbUserInfo: PropTypes.func.isRequired,
	selectFbPage: PropTypes.func.isRequired,
	fbUserPages: PropTypes.array.isRequired,
	setYTUserInfo: PropTypes.func.isRequired,
	twitterLogin: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	fbUserPages: state.facebook.pages.allUserPages,
	fbPageHandler: state.facebook.pages.selectedPageInfo
		? state.facebook.pages.selectedPageInfo.handler
		: '',
})

export default connect(mapStateToProps, {
	setFbUserInfo,
	selectFbPage,
	setYTUserInfo,
	twitterLogin,
})(UserAuthFields)
