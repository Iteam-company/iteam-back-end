import { SMTP_USER } from '../../env';

export const styles = `
    <style>

    * { 
        font-family: arial;
        margin: 0;
        padding: 0;
        color: white; 
    }

    .row {
        display: flex;
        gap: 10px;
        flex-direction: row;
    }

    .column {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    .justify-centered {
        justify-content: center;
    }

    .align-centered {
        align-items: center;
    }

    header {
        padding: 10px;
        background: black;
        color: white;      
    }

    footer {
        padding: 15px;
        background: black;
        color: white;          
    }

    main * {
        color: black;
    }

    .full-width: {
        width: 100%
    }

    .logo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 10px;
    }

    a {
        color: grey;
    }

    </style>
`;

interface HeaderArgs {
	title: string;
	icon?: string;
}

export const header = ({ title, icon }: HeaderArgs) => `
    <header class="row align-centered full-width">
        ${icon ? `<img class="logo" alt="iteam-logo" src="${icon}" />` : ''}
        <h1>${title}</h1>
    </header>
`;

export const footer = () => `
    <footer class="column justify-centered align-centered full-width">
        <ul>
        <li>Test li</li>
        <li>Test li</li>
        <li>Test li</li>
        </ul>
        <a href="mailto:${SMTP_USER}">Support</a>
    </footer>
`;

interface MainArgs {
	title: string;
	text: string;
	links?: { title: string; href: string }[];
}

export const main = ({ title, text, links }: MainArgs) => `
    <main class="column align-centered full-width">
     <h2>${title}</h2>
     <article>
        <p>${text}</p>
     </article>
     ${
			links
				? links.map(
						({ title, href }) => `<a href="${href}">${title}</a>`
				  )
				: ''
		}
    </main>
`;

export const wrapper = (...args: string[]) => `<html>
        ${styles}
        ${args.map((layout) => layout)}
</html>`;

export const allLayoutsForTest = () =>
	wrapper(
		header({ title: 'Iteam', icon: './img/default.webp' }),
		main({ title: 'Here is test msg', text: 'Test message' }),
		footer()
	);
