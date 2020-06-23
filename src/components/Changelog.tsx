import { Button, Card, Divider, Modal, Space, Switch } from "antd";
import React, { useCallback } from "react";
import { useToggle } from "../hooks/useToggle";

const versions: { version: string; changes: string[] }[] = [
	{
		version: "0.2.5",
		changes: [
			"URL changed to randomizer.valaxor.com",
			"Random Keyblade abilities released",
		],
	},
	{
		version: "0.2.4e4",
		changes: ["Fixed extra form keyblades base abilities"],
	},
	{
		version: "0.2.4e3",
		changes: ["Added extra form keyblades to the pool"],
	},
	{
		version: "0.2.4e2",
		changes: [
			"Prevented Keyblades from getting growth abilities",
			"Changed from Own pool and Randomize to Support and Action/Support",
		],
	},
	{
		version: "0.2.4e1",
		changes: ["Added random Keyblade abilities as an experimental setting"],
	},
	{
		version: "0.2.4",
		changes: [
			"Removed Save the Queen and Save the King from Synth Rewards",
			"Upgraded Synth Rewards to their Plus version",
			"Added several staffs/shields with abilities to Donald and Goofy's pool (including Save the Queen+ and Save the King+)",
		],
	},
	{
		version: "0.2.3",
		changes: [
			"Level 1 is now possible when Critical Mode is disabled, the chests at the Garden of Assemblage will contain Scan, Guard and No Experience.",
			"Fixed bug where if Leveling was set to Level 1 and Simulated Twilight Town was set to Vanilla there would be three copies of Guard, Scan and Aerial Recovery",
		],
	},
	{
		version: "0.2.2",
		changes: [
			"Released Random Bonus Modifiers (HP/MP/Drive/Accessory/Armor/Item upgrades)",
		],
	},
	{
		version: "0.2.1",
		changes: ["Fixed Level Up Abilities setting not working properly"],
	},
	{
		version: "0.2.0e1",
		changes: ["Fixed HP/MP modifier values"],
	},
	{
		version: "0.2.0",
		changes: [
			"Added Experimental tab",
			"Added Bonus Modifiers (HP/MP/Drive/Accessory/Armor/Item upgrades) as an experimental setting",
		],
	},
	{
		version: "0.1.8",
		changes: [
			"Split Absent Silhouette and Data Organization XIII fights as options",
			'AS/Datas will not be randomized if their world is not set to "Randomize"',
		],
	},
	{
		version: "0.1.7",
		changes: [
			"Fixed a bug where the shared link would not be properly encoded",
		],
	},
	{
		version: "0.1.6",
		changes: [
			"Beginner/Standard/Proud now start with 48 AP Boosts to match Critical's 50 starting AP (will change this in the future when it's figured out how to change the starting AP stat)",
		],
	},
	{
		version: "0.1.5",
		changes: [
			"Fixed bug where Final Form wouldn't have its rewards properly handled when either Form Abilities/Growth Abilities weren't set to \"Randomize\"",
			"Fixed shared link",
		],
	},
	{
		version: "0.1.4",
		changes: [
			"Made Offline Mode optional",
			"Persisting URL in browser history when sharing link or when downloading seed",
		],
	},
	{
		version: "0.1.3",
		changes: [
			"Fixed a bug that included rewards in locations that weren't supposed to contain those rewards",
		],
	},
	{
		version: "0.1.2",
		changes: [
			"Moved Betwixt and Between reward from The World That Never Was to Twilight Town",
		],
	},
	{
		version: "0.1.1",
		changes: [
			"Fixed Olympus Demyx's reward",
			"Fixed Goddess of Fate Cup having three rewards",
		],
	},
	{
		version: "0.1.0",
		changes: [
			"UI Redesign",
			"Option to replace locations with useless rewards",
			"Extra options (Terra, Sephiroth, Promise Charm, and others)",
			"Choose your language patch before downloading the seed.",
			"Search feature in Spoiler Logs (Ctrl+F)",
			"Better mobile experience (lanscape mode recommended when viewing the Spoiler Logs)",
			"Shorter URLs",
			"Website works while offline",
		],
	},
];

export const Changelog: React.FC = () => {
	const [modalVisible, toggleModalVisible] = useToggle(false);

	const onOfflineMode = useCallback(() => {
		if (localStorage.getItem("offlineMode")) {
			localStorage.removeItem("offlineMode");
		} else {
			localStorage.setItem("offlineMode", "true");
		}

		window.location.reload(true);
	}, []);

	return (
		<div style={{ margin: "0 auto", maxWidth: 1200 }}>
			{versions.map(({ version, changes }, index) => (
				<Card
					title={version}
					style={{ width: "100%", marginBottom: 24 }}
					key={version}
					extra={
						index === 0 ? (
							<Space>
								<div>Offline Mode</div>
								<Switch
									checked={!!localStorage.getItem("offlineMode")}
									onChange={onOfflineMode}
								/>

								<Divider type="vertical" />

								<Button onClick={toggleModalVisible} block>
									How to Update
								</Button>

								<Modal
									title="How to Update"
									visible={modalVisible}
									onCancel={toggleModalVisible}
									footer={[
										<Button onClick={toggleModalVisible} key="cancel">
											Cancel
										</Button>,
										<Button
											type="primary"
											onClick={() => {
												window.location.reload(true);
											}}
											key="submit"
										>
											Refresh without cache
										</Button>,
									]}
								>
									<p>
										If you are not using Offline Mode, refreshing the website
										should give you the latest version.
									</p>

									<p>
										If you are using Offline Mode, you'll have to refresh
										without cache. The button below attempts to do so but it
										doesn't always work, so you'll have to search how to refresh
										without cache on your browser.
									</p>

									<p>You can also turn off Offline Mode and turn it back on.</p>

									<p>
										Make sure you have an internet connection before updating.
									</p>
								</Modal>
							</Space>
						) : null
					}
				>
					<ul>
						{changes.map(change => (
							<li key={change}>{change}</li>
						))}
					</ul>
				</Card>
			))}
		</div>
	);
};
