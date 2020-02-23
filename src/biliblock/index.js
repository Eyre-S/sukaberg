import './style.scss';
import './editor.scss';

const {__} = wp.i18n;
const {
	registerBlockType,
	query
} = wp.blocks;
const {
	TextControl
} = wp.components;

registerBlockType (
	'sukaberg/biliblock',
	{
		title:__('Bili Block'),
		icon: 'album',
		category: 'widgets',
		keywords: [
			__('anime')
		],
		attributes: {
			title: {
				type: 'string',
				default: 'Anime'
			},
			img: {
				type: 'string',
				default: 'https://srv.sukazyo.cc/assets/anime/'	
			},
			location: {
				type: 'string',
				default: 'bilibili'
			},
			total: {
				type: 'string',
				default: ''
			},
			now: {
				type: 'string',
				default: ''
			},
			state: {
				type: 'string',
				default: '已看完'
			},
			stime: {
				type: 'string',
				default: '????-??-??'
			},
			ftime: {
				type: 'string',
				default: '????-??-??'
			}
		},
		edit: ( props ) => {
			const {attributes: {title, img, location, total, now, state, stime, ftime}, setAttributes } = props;
			function setState (event) {
				const selected = event.target.querySelector( '#biliblock-state-chooser option:checked' );
				setAttributes({state: selected.value});
				event.preventDefault();
			}
			function setNow (now) {
				setAttributes({now});
			}
			function setTotal (total) {
				setAttributes({total});
			}
			function setTitle (title) {
				setAttributes({title});
			}
			function setImg (img) {
				setAttributes({img});
			}
			function setStime (stime) {
				setAttributes({stime});
			}
			function setFtime (ftime) {
				setAttributes({ftime});
			}
			function setLocation (location) {
				setAttributes({location});
			}
			return(
				<div className="biliblock-anime-card" >
					番名<TextControl className="biliblock-text" value={title} onChange={setTitle} />
					视觉图链接<TextControl className="biliblock-text" value={img} onChange={setImg} />
					<form onSubmit={setState} className="biliblock-block">
						观看状态：
						<select id="biliblock-state-chooser" value={state} onChange={setState}>
							<option value='等待上映'>等待上映</option>
							<option value='观看中'>观看中</option>
							<option value='已看完'>已看完</option>
						</select>
					</form>
					<div className="biliblock-num-block">
						<div className="biliblock-dat-inp">
							<TextControl label="看完时间" value={ftime} onChange={setFtime}/>
						</div>
						<div className="biliblock-dat-inp">
							<TextControl label="开始时间" value={stime} onChange={setStime}/>
						</div>
						<div className="biliblock-num-inp">
							<TextControl label="全部" value={total} onChange={setTotal}/>
						</div>
						<div className="biliblock-num-inp">
							<TextControl label="已看" value={now} onChange={setNow}/>
						</div>
					</div>
					<div className="biliblock-clear">追番位置(html)</div><TextControl className="biliblock-text" value={location} onChange={setLocation}/>
				</div>
			);
		},
		save: ( props ) => {
			const {attributes: {title, img, location, total, now, state, stime, ftime} } = props;
			var progress = (parseFloat(now) / parseFloat(total)) * 100;
			var progsty = "border-radius: 100px;width:" + progress + "%; height: 100%; background-color: ";
			var progstr = state;
			if (state == "观看中") {
				progsty = progsty + "rgba(251,226,81, 0.42);";
				progstr = progstr + " : " + now + " / " + total;
			} else if (state == "等待上映") {
				progsty = progsty + "rgba(251,226,81, 0.42);";
				progstr = progstr + " : " + "PV" + total;
			} else {
				progsty = progsty + "rgba(61, 243, 61, 0.42);";
				progstr = progstr + " : " + ftime;
			}
			return(
			<div class="biliblock-anime-card" style="height: 160px; padding: 0px;">
				<div style="width:130px;height:160px;line-height:160px;float:left; border-radius: 8px; margin-right:10px">
					<img style="border-radius: 4px; margin: 10px; height: 140px" src={img}></img>
				</div>
				<div class="biliblock-anime-intro" style="height:160px;line-height:normal;width:auto; padding:10px; margin-left:130px">
					<h4 style="margin:0; height: 32.36px; margin:7.416px; line-height: 1.618;">
						<div class="biliblock-round-led" style="background-color: #FEDFE1 ; margin: 6.17px"> </div>
						{title}
						<div class="biliblock-round-led" style="width: 60%; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15); float: right; margin:6.17px; text-align: center;">
							<p style="float:left; width: 100%; margin: 0;text-align: center;">{progstr}</p>
							<div style={progsty}></div>
						</div>
					</h4>
					<p style="margin:0px;">追番位置:{location}</p>
					<p style="margin:0px;">首次观看时间:{stime}</p>
				</div>
			</div>
			);
		}
	}
)